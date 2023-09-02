const AIRSTACK_API_ENDPOINT: string = 'https://api.airstack.xyz/gql'
const AIRSTACK_API_KEY: string = '7468f364d6bd4943afa09c0ca51d2b94' // Replace with your API key

interface SocialMediaInfo {
  name: string
  avatar: string | null
  profileInfo: {
    dappName: string
    profileName: string
    userId: string
    userAddress: string
  }
}

export async function getSocialMediaInfo(
  ethAddresses: Array<string>
): Promise<Array<SocialMediaInfo>> {
  const results = await Promise.all(
    ethAddresses.map(async ethAddress => {
      const ensProfileName = await getENSProfileName(ethAddress)
      const avatarUrl = ensProfileName ? getAvatarUrl(ensProfileName) : null

      let info = await getProfileFromDapp(ethAddress, 'farcaster')

      if (!info) {
        info = await getProfileFromDapp(ethAddress, 'lens')
      }
      if (!info && ensProfileName) {
        info = {
          name: ensProfileName,
          avatar: avatarUrl,
          profileInfo: {
            dappName: 'ens',
            profileName: ensProfileName,
            userId: ethAddress,
            userAddress: ethAddress
          }
        }
      }
      if (info) {
        info.avatar = avatarUrl
      }

      return info
    })
  )

  // Filter out null values
  return results.filter(result => result !== null) as Array<SocialMediaInfo>
}

async function getProfileFromDapp(
  ethAddress: string,
  dappName: string
): Promise<SocialMediaInfo | null> {
  const query = `
        query {
            Socials(input: {filter: {identity: {_in: ["${ethAddress}"]}, dappName: {_eq: ${dappName}}}, blockchain: ethereum}) {
                Social {
                    dappName
                    profileName
                    userId
                    userAddress
                }
            }
        }
    `

  const response = await fetch(AIRSTACK_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRSTACK_API_KEY}`
    },
    body: JSON.stringify({ query })
  })

  const responseData = await response.json()
  const data = responseData.data

  if (
    data &&
    data.Socials &&
    data.Socials.Social &&
    data.Socials.Social.length > 0
  ) {
    const socialInfo = data.Socials.Social[0]

    return {
      name: socialInfo.profileName,
      avatar: null, // Will be filled later
      profileInfo: socialInfo
    }
  }

  return null
}

async function getENSProfileName(ethAddress: string): Promise<string | null> {
  const query = `
        query {
            Domain(input: {resolvedAddress: "${ethAddress}", blockchain: ethereum}) {
                name
                owner
                resolvedAddress
            }
        }
    `

  const response = await fetch(AIRSTACK_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRSTACK_API_KEY}`
    },
    body: JSON.stringify({ query })
  })

  const responseData = await response.json()
  const data = responseData.data

  if (data && data.Domain && data.Domain.name) {
    return data.Domain.name
  }

  return null
}

export function getAvatarUrl(profileName: string): string | null {
  return `https://metadata.ens.domains/mainnet/avatar/${profileName}`
}

// Example of request: getSocialMediaInfo(["0xeB1c22baACAFac7836f20f684C946228401FF01C", "0x6f73ea756bd57d3adcafb73a4f5fcd750ec1c387"]).then(info => { console.log(info); });

// Example requests results:
// ```
// [
//     {
//       name: 'richerd.lens',
//       avatar: 'https://metadata.ens.domains/mainnet/avatar/jnsilva.eth',
//       profileInfo: {
//         dappName: 'lens',
//         profileName: 'richerd.lens',
//         userId: '0xeb1c22baacafac7836f20f684c946228401ff01c',
//         userAddress: '0xeb1c22baacafac7836f20f684c946228401ff01c'
//       }
//     },
//     {
//       name: 'nobuilder.eth',
//       avatar: 'https://metadata.ens.domains/mainnet/avatar/libred.eth',
//       profileInfo: {
//         dappName: 'farcaster',
//         profileName: 'nobuilder.eth',
//         userId: '3017',
//         userAddress: '0x0d43fb59fe8e5a8249da942d64af5cbc7116c5a5'
//       }
//     }
//   ]
// ```

type TokenTransfer = {
  amount: string
  formattedAmount: number
  blockTimestamp: string
  token: {
    symbol: string
    name: string
    decimals: number
  }
  from: {
    addresses: Array<string> // Updated to an array of strings
    socials: Array<{
      dappName: string
      profileName: string
    }> | null // Added null based on the provided response
    domains: Array<{
      dappName: string
    }>
  }
  to: {
    addresses: Array<string> // Updated to an array of strings
    socials: Array<{
      dappName: string
      profileName: string
    }> | null // Added null based on the provided response
    domains: Array<{
      name: string
      dappName: string
    }>
  }
  type: string
}

async function getRelatedAddressesByTokenTransfer(
  userEthAddress: string
): Promise<Array<SocialMediaInfo>> {
  const query = `
    query GetTokenTransfers($address: [Identity!]) {
        TokenTransfers(
          input: {
            filter: {
              _or: [
                {from: {_in: $address}},
                {to: {_in: $address}}
              ]
            },
            blockchain: ethereum,
            limit: 100
          }
        ) {
          TokenTransfer {
            from {
              addresses
              socials {
                dappName
                profileName
              }
            }
            to {
              addresses
              socials {
                dappName
                profileName
              }
            }
          }
        }
      }
    `

  const variables = {
    address: [userEthAddress]
  }

  const response = await fetch(AIRSTACK_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AIRSTACK_API_KEY}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  if (!response.ok) {
    console.error(
      `API responded with status: ${response.status} - ${response.statusText}`
    )
    console.error(await response.text())
    throw new Error('Failed to fetch token transfers due to API error')
  }

  const data = await response.json()

  function extractSocialInfo(
    socials: Array<{ dappName: string; profileName: string }>,
    address: string
  ): SocialMediaInfo | null {
    for (const social of socials) {
      if (social.profileName && social.dappName) {
        return {
          name: social.profileName,
          avatar: getAvatarUrl(social.profileName),
          profileInfo: {
            dappName: social.dappName,
            profileName: social.profileName,
            userId: social.profileName, // Assuming profileName is the userId, modify if needed
            userAddress: address
          }
        }
      }
    }

    return null
  }

  const profiles: Array<SocialMediaInfo> = []

  if (data && data.data && data.data.TokenTransfers) {
    const tokenTransfers: Array<TokenTransfer> =
      data.data.TokenTransfers.TokenTransfer
    for (const transfer of tokenTransfers) {
      // For 'from' address
      if (
        transfer.from.addresses[0] !==
        '0x0000000000000000000000000000000000000000'
      ) {
        const socialInfo = extractSocialInfo(
          transfer.from.socials || [],
          transfer.from.addresses[0]
        )

        if (socialInfo) profiles.push(socialInfo)
      }
      // For 'to' address
      if (
        transfer.to.addresses[0] !==
        '0x0000000000000000000000000000000000000000'
      ) {
        const socialInfo = extractSocialInfo(
          transfer.to.socials || [],
          transfer.to.addresses[0]
        )

        if (socialInfo) profiles.push(socialInfo)
      }
    }

    // Filter out addresses without social media and remove duplicates
    const seenAddresses = new Set<string>()

    return profiles.filter(profile => {
      if (
        profile.name &&
        profile.profileInfo.dappName &&
        !seenAddresses.has(profile.profileInfo.userAddress)
      ) {
        seenAddresses.add(profile.profileInfo.userAddress)

        return true
      }

      return false
    })
  }

  throw new Error('Failed to fetch token transfers')
}

// To get suggestion, you can use  getRelatedAddressesByTokenTransfer("0x6f73ea756bd57d3adcafb73a4f5fcd750ec1c387") conjointely to
// getSocialMediaInfo with a hardcoded list of addresses.
