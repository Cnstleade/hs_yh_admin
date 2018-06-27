{
  let reg1 = new RegExp('xyz', 'i');
  let reg2 = new RegExp(/xyz/i);
  console.log(reg1.test('xyz123'), reg2.test('xyz123'));
  let reg3 = new RegExp(/xyz/ig, 'i')
  console.log(reg3.flags);
}
{
    let s = 'bbb_bb_b'
    let a1 = /b+/g;
    let a2 = /b+/y;
    console.log('one',a1.exec(s),a2.exec(s));
}
