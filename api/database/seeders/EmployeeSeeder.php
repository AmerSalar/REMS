<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Find the Engineering Manager created in UserSeeder
        $manager = Employee::where('job_title', 'Engineering Manager')->first();

        // Generate 20 random employees linked to departments
        Employee::factory()
            ->count(20)
            ->create([
                'manager_id' => $manager?->id, // Assign them to report to the Engineering Manager
            ]);
    }
}
