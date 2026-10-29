"use strict";

/* ==========================================================================
 * STN-7 Problem Solving Assessment — all 20 solutions in one file.
 *
 * Design notes
 *  - Every function validates its input and throws a descriptive TypeError /
 *    RangeError on invalid data, instead of failing silently or crashing deep
 *    inside a loop.
 *  - No global state, no caches, no closures kept alive -> no memory leaks.
 *  - Single-pass / O(1)-extra-space algorithms wherever possible.
 *  - In-place problems (12, 14, 15, 18) mutate the input and return as the
 *    signature requires.
 * ========================================================================== */

/* ----------------------------- shared helpers ----------------------------- */

const isInt = (x) => Number.isInteger(x);

function assertArray(a, name) {
  if (!Array.isArray(a)) throw new TypeError(`${name} must be an array`);
}
function assertString(s, name) {
  if (typeof s !== "string") throw new TypeError(`${name} must be a string`);
}
function assertNonNegInt(n, name) {
  if (!isInt(n) || n < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
}

/* ============================ Problem 1 ==================================== */
/* Staircase — O(n^2) output size, built with a single join. */
/**
 * @param {number} n
 * @return {string}
 */
const staircase = function (n) {
  if (!isInt(n)) throw new TypeError("n must be an integer");
  if (n <= 0) return "";
  const rows = new Array(n);
  for (let i = 1; i <= n; i++) {
    rows[i - 1] = " ".repeat(n - i) + "#".repeat(i);
  }
  return rows.join("\n");
};

/* ============================ Problem 2 ==================================== */
/* Grading Students — O(n) */
/**
 * @param {number[]} grades
 * @return {number[]}
 */
const gradingStudents = function (grades) {
  assertArray(grades, "grades");
  const out = new Array(grades.length);
  for (let i = 0; i < grades.length; i++) {
    const g = grades[i];
    if (typeof g !== "number" || Number.isNaN(g)) {
      throw new TypeError("each grade must be a number");
    }
    if (g < 38) {
      out[i] = g;
    } else {
      const next = Math.ceil(g / 5) * 5;
      out[i] = next - g < 3 ? next : g;
    }
  }
  return out;
};

/* ============================ Problem 3 ==================================== */
/* Time Conversion — O(1) */
/**
 * @param {string} s
 * @return {string}
 */
const timeConversion = function (s) {
  assertString(s, "s");
  const m = /^(\d{2}):(\d{2}):(\d{2})\s*(AM|PM)$/i.exec(s.trim());
  if (!m) throw new RangeError('s must look like "hh:mm:ssAM" or "hh:mm:ssPM"');
  let hh = +m[1];
  const mm = +m[2];
  const ss = +m[3];
  const isPM = m[4].toUpperCase() === "PM";
  if (hh < 1 || hh > 12 || mm > 59 || ss > 59) {
    throw new RangeError("time components out of range");
  }
  if (hh === 12) hh = isPM ? 12 : 0;
  else if (isPM) hh += 12;
  const p = (x) => (x < 10 ? "0" + x : "" + x);
  return `${p(hh)}:${m[2]}:${m[3]}`;
};

/* ============================ Problem 4 ==================================== */
/* String Repeat — O(n * |s|) */
/**
 * @param {number} n
 * @param {string} s
 * @return {string}
 */
const repeatStr = function (n, s) {
  assertNonNegInt(n, "n");
  assertString(s, "s");
  if (n === 0 || s.length === 0) return "";
  return s.repeat(n); // native; throws RangeError if result exceeds max string length
};

/* ============================ Problem 5 ==================================== */
/* Reversed Strings — O(n); iterates by code point so emoji/surrogates survive. */
/**
 * @param {string} str
 * @return {string}
 */
const solution = function (str) {
  assertString(str, "str");
  return Array.from(str).reverse().join("");
};

/* ============================ Problem 6 ==================================== */
/* Sum of Positive — O(n) */
/**
 * @param {number[]} arr
 * @return {number}
 */
const positiveSum = function (arr) {
  assertArray(arr, "arr");
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (typeof v !== "number" || Number.isNaN(v)) {
      throw new TypeError("arr must contain only numbers");
    }
    if (v > 0) sum += v;
  }
  return sum;
};

/* ============================ Problem 7 ==================================== */
/* Grasshopper Summation — O(1) via n(n+1)/2 */
/**
 * @param {number} num
 * @return {number}
 */
const summation = function (num) {
  if (!isInt(num) || num < 1)
    throw new RangeError("num must be a positive integer");
  // Divide the even factor first so the intermediate product stays exact longer.
  const r = num % 2 === 0 ? (num / 2) * (num + 1) : num * ((num + 1) / 2);
  if (!Number.isSafeInteger(r))
    throw new RangeError("result exceeds safe integer range");
  return r;
};

/* ============================ Problem 8 ==================================== */
/* Convert a Boolean to a String — O(1) */
/**
 * @param {boolean} b
 * @return {string}
 */
const booleanToString = function (b) {
  if (typeof b !== "boolean") throw new TypeError("b must be a boolean");
  return b ? "true" : "false";
};

/* ============================ Problem 9 ==================================== */
/* Fizz Buzz — O(n) */
/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = function (n) {
  assertNonNegInt(n, "n");
  const out = new Array(n);
  for (let i = 1; i <= n; i++) {
    const d3 = i % 3 === 0;
    const d5 = i % 5 === 0;
    out[i - 1] = d3 && d5 ? "FizzBuzz" : d3 ? "Fizz" : d5 ? "Buzz" : String(i);
  }
  return out;
};

/* ============================ Problem 10 =================================== */
/* Running Sum of 1D Array — O(n) time, O(n) output */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const runningSum = function (nums) {
  assertArray(nums, "nums");
  const out = new Array(nums.length);
  let acc = 0;
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    if (typeof v !== "number" || Number.isNaN(v)) {
      throw new TypeError("nums must contain only numbers");
    }
    acc += v;
    out[i] = acc;
  }
  return out;
};

/* ============================ Problem 11 =================================== */
/* Richest Customer Wealth — O(rows * cols), O(1) space */
/**
 * @param {number[][]} accounts
 * @return {number}
 */
const maximumWealth = function (accounts) {
  assertArray(accounts, "accounts");
  let best = 0;
  for (let i = 0; i < accounts.length; i++) {
    const row = accounts[i];
    assertArray(row, "each accounts row");
    let total = 0;
    for (let j = 0; j < row.length; j++) {
      const v = row[j];
      if (typeof v !== "number" || Number.isNaN(v)) {
        throw new TypeError("accounts must contain only numbers");
      }
      total += v;
    }
    if (total > best) best = total;
  }
  return best;
};

/* ============================ Problem 12 =================================== */
/* Remove Duplicates from Sorted Array — two pointers, O(n) time, O(1) space */
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
  assertArray(nums, "nums");
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) nums[k++] = nums[i];
  }
  return k;
};

/* ============================ Problem 13 =================================== */
/* Contains Duplicate — O(n) average, early exit on first repeat */
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = function (nums) {
  assertArray(nums, "nums");
  const seen = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) return true;
    seen.add(nums[i]);
  }
  return false;
};

/* ============================ Problem 14 =================================== */
/* Move Zeroes — in-place, single pass, O(n) time, O(1) space */
/**
 * @param {number[]} nums
 * @return {void}
 */
const moveZeroes = function (nums) {
  assertArray(nums, "nums");
  let w = 0; // next write position for a non-zero value
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      if (r !== w) {
        const t = nums[w];
        nums[w] = nums[r];
        nums[r] = t;
      }
      w++;
    }
  }
};

/* ============================ Problem 15 =================================== */
/* Merge Sorted Array — fill from the back, O(m+n) time, O(1) space */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
const merge = function (nums1, m, nums2, n) {
  assertArray(nums1, "nums1");
  assertArray(nums2, "nums2");
  assertNonNegInt(m, "m");
  assertNonNegInt(n, "n");
  if (nums1.length < m + n)
    throw new RangeError("nums1 must have length >= m + n");
  if (nums2.length < n) throw new RangeError("nums2 must have length >= n");

  let i = m - 1;
  let j = n - 1;
  let w = m + n - 1;
  while (j >= 0) {
    // When nums1's valid part is exhausted (i < 0), remaining nums2 goes in.
    nums1[w--] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
};

/* ============================ Problem 16 =================================== */
/* 3Sum — sort + two pointers, O(n^2) time. Input array is NOT mutated. */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  assertArray(nums, "nums");
  const res = [];
  const len = nums.length;
  if (len < 3) return res;

  const a = Int32Array.from(nums); // typed-array sort is numeric + fast
  for (let i = 0; i < len; i++) {
    if (typeof nums[i] !== "number" || !isInt(nums[i])) {
      throw new TypeError("nums must contain only integers");
    }
  }
  a.sort();

  for (let i = 0; i < len - 2; i++) {
    if (a[i] > 0) break; // smallest value positive -> no zero-sum possible
    if (i > 0 && a[i] === a[i - 1]) continue; // skip duplicate anchors
    let lo = i + 1;
    let hi = len - 1;
    while (lo < hi) {
      const s = a[i] + a[lo] + a[hi];
      if (s === 0) {
        res.push([a[i], a[lo], a[hi]]);
        while (lo < hi && a[lo] === a[lo + 1]) lo++;
        while (lo < hi && a[hi] === a[hi - 1]) hi--;
        lo++;
        hi--;
      } else if (s < 0) {
        lo++;
      } else {
        hi--;
      }
    }
  }
  return res;
};

/* ============================ Problem 17 =================================== */
/* Plus One — O(n) worst case, handles all-9s carry. Input is not mutated. */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = function (digits) {
  assertArray(digits, "digits");
  if (digits.length === 0) throw new RangeError("digits must be non-empty");
  for (let i = 0; i < digits.length; i++) {
    if (!isInt(digits[i]) || digits[i] < 0 || digits[i] > 9) {
      throw new RangeError("each digit must be an integer from 0 to 9");
    }
  }
  const out = digits.slice();
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i] < 9) {
      out[i]++;
      return out;
    }
    out[i] = 0;
  }
  out.unshift(1); // every digit was 9
  return out;
};

/* ============================ Problem 18 =================================== */
/* Reverse String (in-place) — two pointers, O(n) time, O(1) space */
/**
 * @param {string[]} s
 * @return {void}
 */
const reverseString = function (s) {
  assertArray(s, "s");
  for (let l = 0, r = s.length - 1; l < r; l++, r--) {
    const t = s[l];
    s[l] = s[r];
    s[r] = t;
  }
};

/* ============================ Problem 19 =================================== */
/* Length of Last Word — scan from the end, O(n) worst case, O(1) space */
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = function (s) {
  assertString(s, "s");
  let i = s.length - 1;
  while (i >= 0 && s.charCodeAt(i) === 32) i--; // skip trailing spaces
  let len = 0;
  while (i >= 0 && s.charCodeAt(i) !== 32) {
    len++;
    i--;
  }
  return len;
};

/* ============================ Problem 20 =================================== */
/* Longest Common Prefix — vertical scan, O(total chars), O(1) extra space */
/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) {
  assertArray(strs, "strs");
  if (strs.length === 0) return "";
  for (let i = 0; i < strs.length; i++)
    assertString(strs[i], "each element of strs");

  const first = strs[0];
  for (let col = 0; col < first.length; col++) {
    const ch = first.charCodeAt(col);
    for (let row = 1; row < strs.length; row++) {
      if (col >= strs[row].length || strs[row].charCodeAt(col) !== ch) {
        return first.slice(0, col);
      }
    }
  }
  return first;
};

/* ------------------------------- exports ---------------------------------- */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    staircase,
    gradingStudents,
    timeConversion,
    repeatStr,
    solution,
    positiveSum,
    summation,
    booleanToString,
    fizzBuzz,
    runningSum,
    maximumWealth,
    removeDuplicates,
    containsDuplicate,
    moveZeroes,
    merge,
    threeSum,
    plusOne,
    reverseString,
    lengthOfLastWord,
    longestCommonPrefix,
  };
}
