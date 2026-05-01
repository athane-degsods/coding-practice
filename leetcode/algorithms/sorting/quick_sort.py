"""
Quick Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
    INPUT: nums

    N = length of us_nums


Time Complexity: O()
Space Complexity: O()
"""

array = [3,2,5,0,1,8,7,6,9,4]

def quick_sort(nums):
    if len(nums) <= 1:
        return nums
    pivot = nums[len(nums) // 2]
    left = [x for x in nums if x < pivot]
    middle = [x for x in nums if x == pivot]
    right = [x for x in nums if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

sorted_array = quick_sort(array)
print('sorted array is', sorted_array)