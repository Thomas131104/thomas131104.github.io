from fastapi import Depends, APIRouter, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .database import get_db
from .models import Mail
from .schemas import MailCreate, MailRead

api = APIRouter()

@api.get("/")
def hello():
    return {"message": "Hello World"}

@api.post("/mails", response_model=MailRead)
async def save_mail(mail: MailCreate, db: AsyncSession = Depends(get_db)):
    db_mail = Mail(**mail.dict())
    db.add(db_mail)
    await db.commit()
    await db.refresh(db_mail)
    return db_mail

@api.get("/mails", response_model=list[MailRead])
async def list_mails(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Mail))
    return result.scalars().all()

@api.post("/send")
async def send_mail(
    name: str = Form(...),
    email: str = Form(...),
    content: str = Form(...),
    send_method: str = Form(...),
    db: AsyncSession = Depends(get_db)
):
    db_mail = Mail(name=name, email=email, content=content, method=send_method)
    db.add(db_mail)
    await db.commit()
    await db.refresh(db_mail)
    return {"message": "Mail đã được lưu!", "id": db_mail.id}