import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    collectCoverage: true,
    coverageReporters: ["json", "html"],
    transform: {
  '^.+\\.tsx?$': 'ts-jest',
},
};
export default config;
