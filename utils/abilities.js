const {AbilityBuilder,Ability} = require('@casl/ability');
exports.defineAbilities = (user) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user.role === 'Doctor') {
        can('manage', 'all');
    } else if (user.role === 'Admin') {
        can('manage', 'users');
    } else {
        can('read', 'profile');
        cannot('manage', 'all');
    }

    return build();
};