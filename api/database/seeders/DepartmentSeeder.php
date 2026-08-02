<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create essential fixed departments first
        $defaultDepartments = [
            [
                'name' => 'Human Resources',
                'description' => 'Handles recruitment, employee welfare, and personnel operations.',
            ],
            [
                'name' => 'Engineering',
                'description' => 'Responsible for software development, system infrastructure, and QA.',
            ],
            [
                'name' => 'Finance',
                'description' => 'Manages company budgeting, financial reporting, and payroll processing.',
            ],
        ];

        foreach ($defaultDepartments as $dept) {
            Department::firstOrCreate(
                ['name' => $dept['name']],
                ['description' => $dept['description']]
            );
        }

        // 2. Generate 4 additional random departments using our factory
        Department::factory()->count(4)->create();
    }
}
