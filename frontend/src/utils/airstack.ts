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

async function getSocialMediaInfo(
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

function getAvatarUrl(profileName: string): string | null {
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
