type TypeEmail = {
    value: string
    verified: boolean
}

type TypePhoto = {
    value: string
}


export interface IGoogleProfile {
    id: string
    displayName: string
    name: {
        familyName: string
        givenName: string
    }
    emails: TypeEmail[]
    photos: TypePhoto[]
    // accessToken: string
    // refreshToken: string
}

export interface IResGoogleProfile {
    email: string
    name: string
    avatarPath: string
}