export const TEXT = {
    MESSAGE: {
        UPDATE_SUCCCESS: 'Update successful',
        CREATE_SUCCESS: 'Create successful',
        REQUIRED_FIELD: (name: string) => `Please enter a value for the '${name}' field.`,
        EMAIL_FIELD: `Please enter a valid email address.`,
    },
    BUTTON_TEXT: {
        UPDATE: 'Update',
        CANCEL: 'Cancel',
        ADD: 'Add',
        EDIT: 'Edit',
        SEARCH: 'Search',
        RESET: 'Reset',
        REGISTER: 'Register',
        LOGIN: 'Login',
    },
    TITLE: {
        USER: 'User',
        USER_CREATE: 'Create User',
        USER_EDIT: 'Edit User',
        PERMISSION: 'Permission',
        PERMISSION_CREATE: 'Create Permission',
        PERMISSION_EDIT: 'Edit Permission',
    },
    AUTOCOMPLETE: {
        MALE: 'Male',
        FEMALE: 'Female',
        METHODS: ['GET', 'POST', 'PATCH', 'DELETE'],
    },
};
