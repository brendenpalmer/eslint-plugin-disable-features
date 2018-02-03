import requireIndex from 'requireindex';
import path from 'path';

export default {
  rules: requireIndex(path.join(__dirname, '/rules')),
};
