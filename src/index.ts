import { server } from './server';

const host: string = '0.0.0.0:3000';

server.listen(3000, () => console.log(`Server is listening on port ${host}`));
