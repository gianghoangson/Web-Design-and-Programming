import { spawn } from 'node:child_process';

const children = [
  spawn('npm', ['run', 'dev', '--workspace', 'backend'], { stdio: 'inherit' }),
  spawn('npm', ['run', 'dev', '--workspace', 'frontend'], { stdio: 'inherit' }),
];

const stop = () => {
  for (const child of children) child.kill('SIGTERM');
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
process.on('exit', stop);
for (const child of children)
  child.on('exit', (code) => code && process.exitCode === 0 && (process.exitCode = code));
