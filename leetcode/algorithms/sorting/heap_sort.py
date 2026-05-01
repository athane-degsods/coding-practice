"""
Heap Sort Algorithm
---------------------
Problem: https://leetcode.com/problems/sort-an-array/description/

Pseudocode:
FUNCTION heap_sort(nums):
    n = LENGTH(nums)

    // Phase 1: Build a max heap
    FOR i FROM (n / 2) - 1 DOWN TO 0:
        heapify(nums, n, i)

    // Phase 2: Repeatedly extract the maximum element
    FOR i FROM n - 1 DOWN TO 1:
        SWAP nums[0] WITH nums[i]
        heapify(nums, i, 0) // 'i' is the new heap size

    RETURN nums

// Helper function
FUNCTION heapify(arr, heap_size, root_index):
    largest = root_index
    left_child_index = 2 * root_index + 1
    right_child_index = 2 * root_index + 2

    IF left_child_index < heap_size AND arr[left_child_index] > arr[largest]:
        largest = left_child_index

    IF right_child_index < heap_size AND arr[right_child_index] > arr[largest]:
        largest = right_child_index

    IF largest != root_index:
        SWAP arr[root_index] WITH arr[largest]
        heapify(arr, heap_size, largest)


Time Complexity: O(n log n)
Space Complexity: O(1)
"""

class Solution(object):
    def sortArray(self, nums):
        """
        Sorts an array using heap sort.
        :type nums: List[int]
        :rtype: List[int]
        """
        n = len(nums)
        
        # Build a max heap
        for i in range(n // 2 - 1, -1, -1):
            self.heapify(nums, n, i)

        # Rearrange the array
        for i in range(n - 1, 0, -1):
            nums[i], nums[0] = nums[0], nums[i]
            self.heapify(nums, i, 0)
        
        return nums
    
    def heapify(self, nums, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and nums[left] > nums[largest]:
            largest = left
        
        if right < n and nums[right] > nums[largest]:
            largest = right

        if largest != i:
            nums[i], nums[largest] = nums[largest], nums[i]
            self.heapify(nums, n, largest)
    
if __name__ == "__main__":
    solution = Solution()
    nums = [1,5,6,7,2,2,2,3,2,4,5,6,7,8,9,0]
    sorted_nums = solution.sortArray(nums)
    print(sorted_nums)
