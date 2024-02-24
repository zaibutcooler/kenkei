from pydantic import BaseModel

# Pydantic model for creating a new notification
class NotificationCreate(BaseModel):
    title: str
    message: str
    recipient: str  # Could be user ID, email, device token, etc.


# Pydantic model for representing notification data in database (if applicable)
class NotificationInDB(BaseModel):
    title: str
    message: str
    recipient: str
