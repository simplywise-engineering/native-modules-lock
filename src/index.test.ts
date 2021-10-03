import test from 'ava'


test.before(async t => {
  console.log('Starting tests')
})

test('can run a test', async t => {
  t.true(true);
})
