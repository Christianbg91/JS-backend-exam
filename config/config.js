const config = {
    PORT: 5000,
    DB_URI: `mongodb://localhost/examkris`,
    SALT_ROUNDS: 10,
    SECRET: 'SUPERSECRETSECRET',
    COOKIE_NAME: 'TOKEN',
    CATEGORIES: ['advertising', 'benefits', 'car', 'equipment', 'fees', 'home-office', 'insurance',
        'interest', 'Labor', 'maintenance', 'materials', 'meals-and-entertainment', 'office-supplies',
        'other', 'professional-services', 'rent', 'taxes', 'travel', 'utilities']
}


module.exports = config