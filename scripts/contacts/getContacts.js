const intercomClient = require('../../utils/intercomClient');

/**
 * Fetches all contacts from Intercom
 * @param {boolean} includeTestContacts - Whether to include test contacts (default: true)
 * @returns {Promise<Array>} - Array of contact objects
 */
const getContacts = async (includeTestContacts = true) => {
    try {
        const { data: contacts } = await intercomClient.get(
            '/contacts?per_page=50'
        );
        if (!includeTestContacts) {
            contacts.data = contacts.data.filter(
                contact => contact.email !== 'hospitriweb@gmail.com'
            );
        }
        console.log({
            message: `✅ Fetched ${contacts.data.length} contacts from Intercom.`,
            contacts: contacts.data.map(contact => ({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                company_count: contact.companies?.data.length,
            })),
        });
        return contacts;
    } catch (error) {
        console.error(
            'Error fetching contacts:',
            error.response?.data || error.message
        );
        throw error;
    }
}

// Use script
getContacts(false);
