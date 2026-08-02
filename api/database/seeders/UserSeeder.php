<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use App\Models\Department;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $engineering = Department::where('name', 'Engineering')->first();
        $hr = Department::where('name', 'Human Resources')->first();

        // 1. Create System Admin
        $adminUser = User::create([
            'name' => 'System Admin',
            'email' => 'admin@rems.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        Employee::create([
            'user_id' => $adminUser->id,
            'department_id' => $hr?->id,
            'employee_code' => 'EMP-0001',
            'job_title' => 'Chief Technology Officer',
            'salary' => 150000.00,
            'hire_date' => '2023-01-01',
            'phone' => '+15550000001',
        ]);

        // 2. Create Engineering Manager
        $managerUser = User::create([
            'name' => 'Sarah Jenkins',
            'email' => 'manager@rems.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'is_active' => true,
        ]);

        Employee::create([
            'user_id' => $managerUser->id,
            'department_id' => $engineering?->id,
            'employee_code' => 'EMP-0002',
            'job_title' => 'Engineering Manager',
            'salary' => 125000.00,
            'hire_date' => '2023-03-15',
            'phone' => '+15550000002',
        ]);
    }
}
