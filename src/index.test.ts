import test from 'ava'
import { runTask } from './index';


test.before(async t => {
  console.log('Starting tests')
})

test('can run a task', async t => {
  let result = await runTask('Test Message');
  t.true(result);
})
