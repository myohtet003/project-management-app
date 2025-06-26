import React, { useState } from "react";
import { useForm } from "@inertiajs/react"; 
import { router } from "@inertiajs/react";

export default function Comment({ comments = [], taskId, authUser }) {
    const [showForm, setShowForm] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("task.comments.store", taskId), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const deleteComment = (commentId) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        router.delete(
            route("task.comments.destroy", { task: taskId, comment: commentId })
        );
    };

    return (
        <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Comments
            </h3>

            <div className="space-y-4 mt-4">
                {comments.length === 0 && (
                    <p className="text-sm text-gray-500">No comments yet!</p>
                )}

                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-3 bg-gray-100 dark:bg-gray-700 rounded shadow"
                    >
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            {comment.user.name}
                        </p>
                        <p className="mt-1 text-gray-700 dark:text-white">
                            {comment.content}
                        </p>
                        <div className="flex items-center gap-3">
                            <p className="text-gray-500 text-xs">
                                {comment.created_at}
                            </p>

                            <button
                                onClick={() => startReply(comment.id)}
                                className="text-xs text-white hover:underline"
                            >
                                Reply
                            </button>

                            {authUser.id === comment.user.id && (
                                // <form
                                //     method="POST"
                                //     action={route("task.comments.destroy", [
                                //         taskId,
                                //         comment.id,
                                //     ])}
                                //     onSubmit={(e) => {
                                //         if (
                                //             !confirm(
                                //                 "Are you sure you want to delete this comment?"
                                //             )
                                //         ) {
                                //             e.preventDefault();
                                //         }
                                //     }}
                                // >
                                //     <input
                                //         type="hidden"
                                //         name="_method"
                                //         value="DELETE"
                                //     />
                                //     <button
                                //         type="submit"
                                //         className="text-xs text-white hover:text-red-500 hover:underline"
                                //     >
                                //         Delete
                                //     </button>
                                // </form>
                                <button
                                    onClick={() => deleteComment(comment.id)}
                                    className="text-xs text-white hover:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                {!showForm ? (
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-sm text-indigo-600 hover:underline pb-6"
                    >
                        + Add a comment
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4">
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            rows="3"
                            placeholder="Write your comment..."
                        />
                        {errors.content && (
                            <p className="text-sm text-red-600 mt-1">
                                {errors.content}
                            </p>
                        )}
                        <div className="mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className=" bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                            >
                                Comment
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="ml-2 text-sm text-gray-500 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
