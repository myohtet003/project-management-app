import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    myPendingTasks,
    totalPendingTasks,
    totalProgressTasks,
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}) {
    // Helper to calculate progress %
    const getPercentage = (myCount, totalCount) =>
        totalCount === 0 ? 0 : Math.round((myCount / totalCount) * 100);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className=" flex justify-end mb-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <a
                        href={route("tasks.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Download Tasks as PDF
                    </a>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Pending Tasks */}
                    <div className="overflow-hidden bg-white shadow-md rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-amber-500 text-xl font-semibold">
                            Pending Tasks
                        </h3>
                        <p className="text-2xl mt-4 text-gray-800 dark:text-white">
                            {myPendingTasks} / {totalPendingTasks}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-amber-500 h-2.5 rounded-full"
                                style={{
                                    width: `${getPercentage(
                                        myPendingTasks,
                                        totalPendingTasks
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* In Progress Tasks */}
                    <div className="overflow-hidden bg-white shadow-md rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-blue-500 text-xl font-semibold">
                            In Progress
                        </h3>
                        <p className="text-2xl mt-4 text-gray-800 dark:text-white">
                            {myProgressTasks} / {totalProgressTasks}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{
                                    width: `${getPercentage(
                                        myProgressTasks,
                                        totalProgressTasks
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Completed Tasks */}
                    <div className="overflow-hidden bg-white shadow-md rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-green-500 text-xl font-semibold">
                            Completed
                        </h3>
                        <p className="text-2xl mt-4 text-gray-800 dark:text-white">
                            {myCompletedTasks} / {totalCompletedTasks}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{
                                    width: `${getPercentage(
                                        myCompletedTasks,
                                        totalCompletedTasks
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* My Active Tasks */}
                <div className="mx-auto mt-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                My Active Tasks
                            </h3>

                            {activeTasks.data.length === 0 ? (
                                <p className="text-gray-500">
                                    No active tasks assigned.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                            <tr className="text-nowrap">
                                                <th className="px-4 py-2">
                                                    ID
                                                </th>
                                                <th className="px-4 py-2">
                                                    Project
                                                </th>
                                                <th className="px-4 py-2">
                                                    Task
                                                </th>
                                                <th className="px-4 py-2">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2">
                                                    Due Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeTasks.data.map((task) => (
                                                <tr
                                                    key={task.id}
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                >
                                                    <td className="px-4 py-2">
                                                        {task.id}
                                                    </td>
                                                    <td className="px-4 py-2 text-white hover:underline">
                                                        <Link
                                                            href={route(
                                                                "project.show",
                                                                task.project.id
                                                            )}
                                                        >
                                                            {task.project.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 text-white hover:underline">
                                                        <Link
                                                            href={route(
                                                                "task.show",
                                                                task.id
                                                            )}
                                                        >
                                                            {task.name}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={
                                                                "px-2 py-1 rounded text-nowrap text-white text-xs font-medium " +
                                                                TASK_STATUS_CLASS_MAP[
                                                                    task.status
                                                                ]
                                                            }
                                                        >
                                                            {
                                                                TASK_STATUS_TEXT_MAP[
                                                                    task.status
                                                                ]
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {task.due_date}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
