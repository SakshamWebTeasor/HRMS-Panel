const { execSync } = require("child_process");

export async function findUUid() {
    const uuid = execSync("wmic csproduct get uuid").toString().trim().split('UUID')[1].trim();
    console.log('::',uuid.replace(/\\r|\\n/g, ''),'::');
    return uuid.replace(/\\r|\\n/g, '')
}