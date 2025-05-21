"""
Insertion Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
    INPUT: nums

    N = length of nums

    FOR i = 0 to N - 1
        min_index = i
        FOR j = i to N - 1
            IF nums[i] > num[j]
                min_index = j   
        IF min_index != i

Time Complexity: O(N^2)
Space Complexity: O(1)
"""

class Solution(object):
    def sortArray(self, nums):
        """
        Sorts an array using selection sort.
        :type nums: List[int]
        :rtype: List[int]
        """
        n = len(nums)
        for i in range(n):
            min_index = i
            for j in range(i + 1, n):
                if nums[j] < nums[min_index]:
                    min_index = j
            if min_index != i:
                nums[i], nums[min_index] = nums[min_index], nums[i]
        return nums
    
    
if __name__ == "__main__":
    solution = Solution()
    nums = [5, 2, 9, 1, 5, 6]
    sorted_nums = solution.sortArray(nums)
    print(sorted_nums)