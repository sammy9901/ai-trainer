from fastapi import FastAPI
from pydantic import BaseModel
from datetime import date, timedelta, datetime

app = FastAPI()

class UserProfile(BaseModel):
    age: int
    gender: str
    heightCm: int
    weightKg: int
    fitnessLevel: str
    healthConditions: list[str] = []
    workoutPreferences: list[str] = []
    availableEquipment: list[str] = []
    timeAvailabilityMinutes: int
    primaryGoal: str

@app.post('/generate-workout')
def generate_workout(profile: UserProfile):
    sets_map = { 'beginner': 3, 'intermediate': 4, 'advanced': 5 }
    reps_map = { 'beginner': 10, 'intermediate': 12, 'advanced': 15 }
    sets = sets_map.get(profile.fitnessLevel, 3)
    reps = reps_map.get(profile.fitnessLevel, 10)

    today = date.today()
    days = []
    base_exercises = [
        { 'id': 'pushups', 'name': 'Push-ups', 'targetMuscleGroup': 'Chest', 'sets': sets, 'reps': reps, 'restSeconds': 60 },
        { 'id': 'squats', 'name': 'Bodyweight Squats', 'targetMuscleGroup': 'Legs', 'sets': sets, 'reps': reps, 'restSeconds': 60 },
        { 'id': 'rows', 'name': 'Bent-over Rows (Band/Dumbbell)', 'targetMuscleGroup': 'Back', 'sets': sets, 'reps': reps, 'restSeconds': 60 },
        { 'id': 'plank', 'name': 'Plank', 'targetMuscleGroup': 'Core', 'sets': max(2, sets - 1), 'reps': 1, 'restSeconds': 45 },
    ]
    for i in range(4):
        days.append({ 'date': (today + timedelta(days=i)).isoformat(), 'exercises': base_exercises })

    plan = {
        'id': f'plan_{int(datetime.now().timestamp()*1000)}',
        'createdAt': datetime.now().isoformat(),
        'goal': profile.primaryGoal,
        'difficulty': profile.fitnessLevel,
        'days': days,
    }
    return plan

