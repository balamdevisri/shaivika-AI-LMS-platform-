const fs = require('fs');
const path = require('path');

const dirs = [
  "src/config", "src/controllers", "src/routes", "src/middleware", "src/services", "src/repositories", "src/models", "src/validators", "src/utils", "src/constants", "src/types", "src/interfaces",
  "src/modules/auth", "src/modules/users", "src/modules/admin", "src/modules/students", "src/modules/courses", "src/modules/lessons", "src/modules/modules", "src/modules/quiz", "src/modules/assignments", "src/modules/certificates", "src/modules/analytics", "src/modules/notifications", "src/modules/ai/prompts", "src/modules/ai/retrieval", "src/modules/ai/chat", "src/modules/ai/knowledge",
  "src/firebase", "src/logs", "tests"
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

console.log('Directories created successfully.');
