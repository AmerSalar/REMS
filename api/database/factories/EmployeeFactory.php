<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            // If user_id isn't provided, automatically create a new User
            'user_id' => User::factory(),

            // Randomly select an existing department ID from MySQL
            'department_id' => Department::inRandomOrder()->first()?->id ?? Department::factory(),

            // Manager ID defaults to null (we will assign managers in the seeder)
            'manager_id' => null,

            'employee_code' => 'EMP-' . $this->faker->unique()->numberBetween(1000, 9999),
            'phone' => $this->faker->phoneNumber(),
            'job_title' => $this->faker->jobTitle(),
            'salary' => $this->faker->randomFloat(2, 45000, 120000), // Salary between 45k and 120k
            'hire_date' => $this->faker->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
            'address' => $this->faker->address(),
            'avatar_url' => null,
        ];
    }
}
