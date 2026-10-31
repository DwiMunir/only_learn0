import test from "node:test";
import assert from "node:assert/strict";
import { bacaSimpan, KUNCI, ubahSimpan } from "./simpan";

test("kunci localStorage", () => {
  assert.equal(KUNCI, "onlylearn:simpan");
});

test("bacaSimpan: isi rusak atau bukan array jadi daftar kosong", () => {
  assert.deepEqual(bacaSimpan(null), []);
  assert.deepEqual(bacaSimpan(""), []);
  assert.deepEqual(bacaSimpan("x"), []);
  assert.deepEqual(bacaSimpan("{}"), []);
  assert.deepEqual(bacaSimpan('"a"'), []);
  assert.deepEqual(bacaSimpan("null"), []);
  assert.deepEqual(bacaSimpan("[1,2]"), []);
});

test("bacaSimpan: hanya string yang valid diambil, tanpa duplikat", () => {
  assert.deepEqual(bacaSimpan('["a",2]'), ["a"]);
  assert.deepEqual(bacaSimpan('["a",null,"b",{"c":1},"a",""]'), ["a", "b"]);
  assert.deepEqual(bacaSimpan('["b","a"]'), ["b", "a"]);
});

test("ubahSimpan: menambah di depan", () => {
  assert.deepEqual(ubahSimpan([], "a"), ["a"]);
  assert.deepEqual(ubahSimpan(["a"], "b"), ["b", "a"]);
});

test("ubahSimpan: yang sudah ada dihapus", () => {
  assert.deepEqual(ubahSimpan(["b", "a"], "a"), ["b"]);
  assert.deepEqual(ubahSimpan(["a"], "a"), []);
});

test("ubahSimpan: tidak pernah duplikat dan tidak mengubah daftar asli", () => {
  const asal = ["b", "a", "b"];
  assert.deepEqual(ubahSimpan(asal, "c"), ["c", "b", "a"]);
  assert.deepEqual(ubahSimpan(asal, "b"), ["a"]);
  assert.deepEqual(asal, ["b", "a", "b"]);
  let d: string[] = [];
  for (const s of ["a", "b", "a", "a", "c"]) d = ubahSimpan(d, s);
  assert.deepEqual(d, ["c", "a", "b"]);
});
