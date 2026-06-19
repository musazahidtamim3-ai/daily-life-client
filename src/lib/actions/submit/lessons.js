import { serverMutation } from "@/lib/core/server"

export const submitLessons = async (newLessonData) => {
     return serverMutation("/api/lessons", newLessonData)
}