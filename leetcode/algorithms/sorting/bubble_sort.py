"""
Bubble Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
    INPUT: unsorted_numbers
    OUTPUT: sorted_numbers

    N = length of unsorted_numbers

    FOR i = 0 to N - 1
        FOR j = 0 to N - i - 2
            IF unsorted_numbers[j] > unsorted_numbers[j+1]
                temp = unsorted_numbers[j]
                unsorted_numbers[j] = unsorted_numbers[j+1]
                unsorted_numbers[j+1] = temp

    sorted_numbers = unsorted_numbers

Time Complexity: O(N^2)
Space Complexity: O(1)
"""

class Solution(object):
    def sortArray(self, nums):
        """
        Sorts an array using bubble sort.
        :type nums: List[int]
        :rtype: List[int]
        """
        n = len(nums)
        for i in range(n):
            swapped = False
            for j in range(0, n - i - 1):
                if nums[j] > nums[j + 1]:
                    nums[j], nums[j + 1] = nums[j + 1], nums[j]
                    swapped = True
            if not swapped:
                break
        return nums

if __name__ == "__main__":
    solution = Solution()
    nums = [5, 2, 9, 1, 5, 6]
    sorted_nums = solution.sortArray(nums)
    print(sorted_nums)
