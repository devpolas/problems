# STN-7 Problem-Solving Assessment

This document summarizes the 20 JavaScript solutions in the assessment
file, including each problem's purpose, approach, complexity, and
notable behavior.

## Shared input-validation helpers

The solutions use three shared helpers:

-   `assertArray(value, name)` throws a `TypeError` when the value is
    not an array.
-   `assertString(value, name)` throws a `TypeError` when the value is
    not a string.
-   `assertNonNegInt(value, name)` throws a `RangeError` unless the
    value is a non-negative integer.

Several functions also validate individual values and throw descriptive
errors for invalid input.

## Problem summaries

  ----------------------------------------------------------------------------------------------------------------------
              \# Problem / Function            Purpose           Approach                     Time         Extra space
                                                                                              complexity   
  -------------- ----------------------------- ----------------- ---------------------------- ------------ -------------
               1 Staircase --- `staircase(n)`  Build a           Build each row with spaces   O(n²) output O(n²) for the
                                               right-aligned     and `#`, then join rows with size         returned
                                               staircase of `#`  newlines.                                 string/rows
                                               characters.                                                 

               2 Grading Students ---          Round grades up   Check each grade and         O(n)         O(n) for the
                 `gradingStudents(grades)`     when the next     calculate the next multiple               returned
                                               multiple of five  of five.                                  array
                                               is less than                                                
                                               three points                                                
                                               away, except                                                
                                               grades below 38.                                            

               3 Time Conversion ---           Convert a 12-hour Parse the time and adjust    O(1)         O(1)
                 `timeConversion(s)`           time string with  the hour for AM/PM and                    
                                               AM/PM to 24-hour  midnight/noon.                            
                                               time.                                                       

               4 String Repeat ---             Return a string   Validate inputs and use the  O(n × string O(size of
                 `repeatStr(n, s)`             repeated `n`      native                       length)      output)
                                               times.            `String.prototype.repeat`.                

               5 Reversed Strings ---          Return a string   Convert to Unicode code      O(n)         O(n)
                 `solution(str)`               in reverse order. points, reverse, and join.                

               6 Sum of Positive ---           Sum only the      Iterate once and add values  O(n)         O(1)
                 `positiveSum(arr)`            positive numbers  greater than zero.                        
                                               in an array.                                                

               7 Grasshopper Summation ---     Calculate the sum Use the arithmetic-series    O(1)         O(1)
                 `summation(num)`              of integers from  formula `n(n + 1) / 2`.                   
                                               1 through `num`.                                            

               8 Convert a Boolean to a String Convert a Boolean Validate the Boolean and     O(1)         O(1)
                 --- `booleanToString(b)`      to `"true"` or    return the matching string.               
                                               `"false"`.                                                  

               9 Fizz Buzz --- `fizzBuzz(n)`   Produce values    Check divisibility by 3 and  O(n)         O(n) for the
                                               from 1 through    5 for each integer.                       returned
                                               `n`, replacing                                              array
                                               multiples of 3                                              
                                               and/or 5 with                                               
                                               labels.                                                     

              10 Running Sum of 1D Array ---   Return an array   Maintain a running           O(n)         O(n) for the
                 `runningSum(nums)`            where each        accumulator in one pass.                  returned
                                               element is the                                              array
                                               cumulative sum up                                           
                                               to that index.                                              

              11 Richest Customer Wealth ---   Find the largest  Sum each row and track the   O(rows ×     O(1)
                 `maximumWealth(accounts)`     row sum in a      maximum.                     columns)     
                                               two-dimensional                                             
                                               array.                                                      

              12 Remove Duplicates from Sorted Remove repeated   Use a write pointer to       O(n)         O(1)
                 Array ---                     values from a     overwrite duplicates.                     
                 `removeDuplicates(nums)`      sorted array in                                             
                                               place and return                                            
                                               the unique-value                                            
                                               count.                                                      

              13 Contains Duplicate ---        Determine whether Track seen values in a `Set` O(n) average O(n)
                 `containsDuplicate(nums)`     any value occurs  and return early on a                     
                                               more than once.   repeat.                                   

              14 Move Zeroes ---               Move all zeroes   Swap non-zero values toward  O(n)         O(1)
                 `moveZeroes(nums)`            to the end while  a write pointer.                          
                                               preserving the                                              
                                               order of non-zero                                           
                                               values.                                                     

              15 Merge Sorted Array ---        Merge two sorted  Fill from the back so        O(m + n)     O(1)
                 `merge(nums1, m, nums2, n)`   arrays into the   existing values are not                   
                                               available space   overwritten.                              
                                               at the end of                                               
                                               `nums1`.                                                    

              16 3Sum --- `threeSum(nums)`     Find unique       Sort a copy and use an       O(n²)        O(n)
                                               triplets whose    anchor plus two pointers,                 auxiliary
                                               sum is zero.      skipping duplicates.                      storage for
                                                                                                           the copied
                                                                                                           array,
                                                                                                           excluding
                                                                                                           results

              17 Plus One ---                  Add one to an     Propagate carry from the     O(n)         O(n) for the
                 `plusOne(digits)`             integer           final digit; prepend `1` if               copied output
                                               represented as an all digits were `9`.                      
                                               array of decimal                                            
                                               digits.                                                     

              18 Reverse String ---            Reverse an array  Swap values from the two     O(n)         O(1)
                 `reverseString(s)`            of characters in  ends using two pointers.                  
                                               place.                                                      

              19 Length of Last Word ---       Return the length Scan backward, skipping      O(n) worst   O(1)
                 `lengthOfLastWord(s)`         of the final word trailing spaces and counting case         
                                               in a string.      the last word.                            

              20 Longest Common Prefix ---     Find the longest  Compare characters           O(total      O(1)
                 `longestCommonPrefix(strs)`   prefix shared by  vertically against the first characters   auxiliary
                                               every string in   string.                      inspected)   space,
                                               an array.                                                   excluding the
                                                                                                           returned
                                                                                                           string
  ----------------------------------------------------------------------------------------------------------------------

## Notes on behavior

-   **Problem 1:** Returns an empty string when `n <= 0`; non-integer
    values cause a `TypeError`.
-   **Problem 2:** Grades below 38 are not rounded. The function checks
    that each grade is a number, but does not enforce an integer or a
    0--100 range.
-   **Problem 3:** Expects a time in the form `hh:mm:ssAM` or
    `hh:mm:ssPM` (whitespace before AM/PM is accepted by the pattern).
    Invalid formats or out-of-range time components cause an error.
-   **Problem 4:** `n` must be a non-negative integer. Very large
    outputs may cause the native `repeat` method to throw a
    `RangeError`.
-   **Problem 5:** `Array.from` reverses by Unicode code point, so
    common emoji and surrogate pairs are handled better than indexing
    UTF-16 code units directly.
-   **Problem 7:** Requires a positive integer and rejects a result
    outside JavaScript's safe-integer range.
-   **Problem 11:** Returns `0` for an empty outer array because the
    maximum starts at zero.
-   **Problem 12:** Assumes the input is sorted. The array is mutated;
    the returned number is the count of unique values in the valid
    prefix.
-   **Problem 14:** Mutates the supplied array and returns `undefined`.
-   **Problem 15:** Mutates `nums1` and returns `undefined`. The first
    `m` values of `nums1` and first `n` values of `nums2` are assumed to
    be sorted.
-   **Problem 16:** The original input is not mutated. The
    implementation converts values to an `Int32Array`, so values outside
    the signed 32-bit integer range can be truncated/wrapped; ordinary
    integer inputs are expected.
-   **Problem 17:** Requires a non-empty array containing only integer
    digits from 0 through 9. It returns a new array without mutating the
    input.
-   **Problem 18:** Mutates the supplied array and returns `undefined`.
-   **Problem 19:** Counts ordinary ASCII spaces (`U+0020`) as
    separators, matching the implementation.
-   **Problem 20:** Returns an empty string for an empty input array and
    validates that each array element is a string.

## In-place versus non-mutating functions

### Mutate the input

-   `removeDuplicates`
-   `moveZeroes`
-   `merge` (mutates `nums1`)
-   `reverseString`

### Return a new array or value without mutating the input

-   The other functions return a new result or a scalar/string. In
    particular, `threeSum` sorts a typed-array copy, and `plusOne` works
    on a copy of `digits`.

## Exported functions

When CommonJS `module.exports` is available, the file exports all 20
functions:

``` js
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
```

## General implementation choices

-   Input validation is used to produce clearer errors for many invalid
    arguments.
-   Most array problems use a single pass or two-pointer approach where
    practical.
-   The in-place solutions are designed to avoid allocating another
    full-size array.
-   Complexity figures describe the algorithm and exclude unavoidable
    output storage where noted.
