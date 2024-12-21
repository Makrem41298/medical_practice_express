const {AbilityBuilder,Ability} = require('@casl/ability');
exports.defineAbilities = (user) => {
    const { can, cannot, build } = new AbilityBuilder(Ability);

    if (user.role === 'Doctor') {
        can('manage', 'all');
    }
    return build();
};