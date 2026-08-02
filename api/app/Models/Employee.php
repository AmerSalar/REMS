<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'department_id',
        'manager_id',
        'employee_code',
        'phone',
        'job_title',
        'salary',
        'hire_date',
        'address',
        'avatar_url',
    ];

    // Employee belongs to 1 User account
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Employee belongs to 1 Department
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    // Employee reports to 1 Manager (self-referential)
    public function manager(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    // Manager manages many Employees
    public function directReports(): HasMany
    {
        return $this->hasMany(Employee::class, 'manager_id');
    }

    // Employee has many Attendance records
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    // Employee has many Leave Requests
    public function leaveRequests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }
}
