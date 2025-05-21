"""
Merge Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
    INPUT: nums 

    FUNCTION mergeSort(nums):
        IF length of nums <= 1:
            RETURN nums

        mid = length of nums // 2
        left = mergeSort(nums[0 : mid])
        right = mergeSort(nums[mid : ])

        RETURN merge(left, right)

    FUNCTION merge(left, right):
        result = empty array
        i = 0
        j = 0

        WHILE i < length of left AND j < length of right:
            IF left[i] <= right[j]:
                append left[i] to result
                i = i + 1
            ELSE:
                append right[j] to result
                j = j + 1

        WHILE i < length of left:
            append left[i] to result
            i = i + 1

        WHILE j < length of right:
            append right[j] to result
            j = j + 1

        RETURN result


Time Complexity: O(n log n)
Space Complexity: O(n)
"""

class Solution(object):
    def sortArray(self, nums):
        """
        Sorts an array using selection sort.
        :type nums: List[int]
        :rtype: List[int]
        """
        def mergeSort(nums):
            if len(nums) <= 1:
                return nums
            
            mid = len(nums) // 2
            left = mergeSort(nums[ : mid])
            right = mergeSort(nums[mid : ])

            return merge(left, right)
        
        def merge(left, right):
            result = []
            i = 0
            j = 0

            while i < len(left) and j < len(right):
                if left[i] <= right[j]:
                    result.append(left[i])
                    i +=1
                else:
                    result.append(right[j])
                    j += 1
            
            while i < len(left):
                result.append(left[i])
                i += 1

            while j < len(right):
                result.append(right[j])
                j += 1

            return result
        return mergeSort(nums)
    
if __name__ == "__main__":
    solution = Solution()
    nums = [5, 2, 9, 1, 5, 6]
    sorted_nums = solution.sortArray(nums)
    print(sorted_nums)
