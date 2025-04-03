export const GuestType = {
    GUEST: "guest", FAMILY: "family"
}
export const GuestStatus = {
    // Month는 0부터 시작하므로 1 빼줘야 함
    YJ_DAD: {
        date: new Date(2025, 4-1, 19, 12, 0, 0)
    },
    YJ_MOM: {
        date: new Date(2025, 3-1, 22, 18, 30, 0)
    },
    JY_DAD: {
        date: new Date(2025, 3-1, 29, 11, 30, 0)
    },
    JY_MOM: {
        date: new Date(2025, 4-1, 13, 12, 0, 0)
    },
    JY_FRIEND: {
        date: new Date(2025, 3-1, 25, 0, 0, 0)
    },
    YJ_FRIEND: {
        date: new Date(2025, 3-1, 25, 0, 0, 0)
    },
    JY_DAD_GUEST: {
        date: new Date(2025, 3-1, 29, 0, 0, 0)
    },
    YJ_DAD_GUEST: {
        date: new Date(2025, 4-1, 19, 0, 0, 0)
    },
    DEFAULT: {
        date: new Date(2025, 5-1, 10, 0, 0, 0)
    }
}