//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

struct Participant {
    address account;
    uint256 amount;
}

struct Challenge {
    uint256 id;
    address owner;
    string title;
    uint256 endDate;
    address beneficiary;
    address safe;
    uint256 totalAmount;
    bool outcome;
}

error AlreadyConcluded();
error NonExistingChallenge();
error NotASafe();
error NotAnOwner();
error ZeroValue();
error ZeroAddress();

contract ChallengeFactory is Ownable {
    using Address for address payable;

    uint256 public lastId;

    mapping(uint256 => Challenge) public challengeById;
    mapping(uint256 => Participant[]) public participantsByChallengeId;

    event ChallengeCreated(uint256 id, address indexed owner, string title, uint256 endDate, address beneficiary);
    event ChallengeCancelled(address indexed who, uint256 id);
    event ChallengeConcluded(address indexed who, uint256 id, bool outcome);

    function create(string calldata title, uint256 endDate, address beneficiary, address safe) external payable {
        lastId++;
        Challenge memory challenge = Challenge(
            lastId,
            msg.sender,
            title,
            endDate,
            beneficiary,
            safe,
            msg.value,
            false
        );
        challengeById[lastId] = challenge;
        emit ChallengeCreated(lastId, msg.sender, title, endDate, beneficiary);
    }

    function cancel(uint256 id) external {
        Challenge storage challenge = challengeById[id];
        if (challenge.id > 0 && challenge.outcome == true) revert AlreadyConcluded();
        if (challenge.owner != msg.sender) revert NotAnOwner();
        payable(challenge.beneficiary).sendValue(challenge.totalAmount);
        emit ChallengeCancelled(msg.sender, id);
    }

    function conclude(uint256 id, bool outcome) external {
        Challenge storage challenge = challengeById[id];
        if (challenge.id > 0 && challenge.outcome == true) revert AlreadyConcluded();
        if (challenge.safe != msg.sender) revert NotASafe();
        challenge.outcome = outcome;
        payable(outcome == true ? challenge.owner : challenge.beneficiary).sendValue(challenge.totalAmount);
        emit ChallengeConcluded(msg.sender, id, challenge.outcome);
    }

    function join(uint256 id) external payable {
        if (msg.value == 0) revert ZeroValue();
        if (challengeById[id].id == 0) revert NonExistingChallenge();
        Participant memory participant = Participant(msg.sender, msg.value);
        participantsByChallengeId[id].push(participant);
    }

    function getParticipantsLength(uint256 id) external view returns (uint256) {
        return participantsByChallengeId[id].length;
    }

    function getParticipants(uint256 id) external view returns (Participant[] memory) {
        return participantsByChallengeId[id];
    }
}
