const intercomClient = require("../../utils/intercomClient");

/**
 * Asigns `active` value to company IDs array
 * @param {Array<string>} companyIds - Intercom Companies IDs array
 * @param {boolean} value - true or false
 */
async function setActive(companyIds, value) {
    const results = [];

    for (const id of companyIds) {
        try {
            const res = await intercomClient.put(`/companies/${id}`, {
                custom_attributes: {
                    active: value,
                },
            });
            results.push({ id, success: true });
        } catch (error) {
            console.error(
                `Error setting active for company ${id}:`,
                error.response?.data || error.message
            );
            results.push({ id, success: false });
        }
    }

    console.log(
        `✅ Complete. ${
            results.filter(r => r.success).length
        } successfully updated.`
    );
    
    return results;
}

// Use script
const companiesToActive = [];
const companiesToInactive = [];

setActive(companiesToActive, true);
setActive(companiesToInactive, false);
