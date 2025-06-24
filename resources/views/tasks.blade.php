<!DOCTYPE html>
<html>
<head>
    <title>My Active Tasks</title>
    <style>
        body { font-family: sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; font-size: 12px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h2>My Active Tasks – {{ $user->name }}</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Task</th>
                <th>Status</th>
                <th>Due Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach($tasks as $task)
            <tr>
                <td>{{ $task->id }}</td>
                <td>{{ $task->project->name }}</td>
                <td>{{ $task->name }}</td>
                <td>{{ ucfirst(str_replace('_', ' ', $task->status)) }}</td>
                <td>{{ $task->due_date }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
