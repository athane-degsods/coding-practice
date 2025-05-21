"""
Insertion Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
    INPUT: us_nums
    OUTPUT: s_nums

    N = length of us_nums

    FOR i = 1 to N - 1
        FOR j = i down to 1
            IF us_nums[j] < us_nums[j - 1]
                temp = us_nums[j]
                us_nums[j] = us_nums[j - 1]
                us_nums[j - 1] = temp
            ELSE
                BREAK
             
    s_nums = us_nums

Time Complexity: O(N^2)
Space Complexity: O(1)
"""

class Solution(object):
    def sortArray(self, nums):
        """
        Sorts an array using insertion sort.
        :type nums: List[int]
        :rtype: List[int]
        """
        n = len(nums)
        for i in range(1, n):
            for j in range(i, 0, -1):
                if nums[j] < nums[j - 1]:
                    nums[j], nums[j - 1] = nums[j - 1], nums[j]
                else:
                    break
        return nums
    
if __name__ == "__main__":
    solution = Solution()
    nums = [5, 2, 9, 1, 5, 6]
    sorted_nums = solution.sortArray(nums)
    print(sorted_nums)
