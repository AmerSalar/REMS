<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        // Preset list of realistic company departments
        $departments = [
            
            'Sales & Marketing',
            'Customer Support',
            'Product Management',
            'Legal & Compliance'
        ];

        return [
            // Selects a unique department name each time
            'name' => $this->faker->unique()->randomElement($departments),
            'description' => $this->faker->paragraph(2),
        ];
    }
}
