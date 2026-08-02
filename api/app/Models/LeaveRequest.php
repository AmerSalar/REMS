<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'approved_by',
        'type',
        'start_date',
        'end_date',
        'reason',
        'status',
        'rejection_reason',
    ];

    // Person who requested leave
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    // Admin/Manager user who approved/rejected leave
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
