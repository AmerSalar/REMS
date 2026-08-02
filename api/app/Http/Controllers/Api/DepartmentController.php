<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Http\Resources\DepartmentResource;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $departments = Department::withCount('employees')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => DepartmentResource::collection($departments),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request): JsonResponse
    {
        // $request->validated() returns only validated fields
        $department = Department::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Department created successfully.',
            'data' => new DepartmentResource($department),
        ], 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department): JsonResponse
    {
        // Load employee count for single department view
        $department->loadCount('employees');

        return response()->json([
            'success' => true,
            'data' => new DepartmentResource($department),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department): JsonResponse
    {
        $department->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Department updated successfully.',
            'data' => new DepartmentResource($department),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department): JsonResponse
    {
        $department->delete();

        return response()->json([
            'success' => true,
            'message' => 'Department deleted successfully.',
        ], 200);
    }
}
