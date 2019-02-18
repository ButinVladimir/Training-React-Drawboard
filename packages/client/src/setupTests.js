/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import 'jest-canvas-mock';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
jest.mock('socket.io-client');

/* eslint-enable */
