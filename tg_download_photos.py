from telethon import TelegramClient
from telethon.tl.types import MessageMediaPhoto
from datetime import datetime, timezone, timedelta
import os
import re

api_id = 37245197
api_hash = '7b1847016674377c1b9bddf76e74ec21'

client = TelegramClient('my_session', api_id, api_hash)

DOWNLOAD_DIR = '/Users/admin/Projects/Филипп/photos_from_client'

# Only messages from March 21, 2026 (Moscow time UTC+3)
MSK = timezone(timedelta(hours=3))
DATE_START = datetime(2026, 3, 21, 0, 0, 0, tzinfo=MSK)
DATE_END = datetime(2026, 3, 22, 0, 0, 0, tzinfo=MSK)

def sanitize(name):
    """Clean folder name from invalid chars."""
    name = re.sub(r'[<>:"/\\|?*\n\r]', '_', name.strip())
    # Truncate long captions to first line or 80 chars
    name = name.split('_')[0] if len(name) > 80 else name
    return name[:80] if name else 'без_подписи'

async def main():
    await client.start()
    print('Подключён. Ищу чат с @plus_1million...')

    entity = await client.get_entity('plus_1million')
    print(f'Чат найден: {entity.first_name}')
    print(f'Загружаю сообщения за 21 марта...\n')

    # First pass: collect all messages from March 21
    messages = []
    async for msg in client.iter_messages(entity, offset_date=DATE_END, reverse=False, limit=500):
        msg_date = msg.date.astimezone(MSK)
        if msg_date < DATE_START:
            break
        if msg_date < DATE_END:
            messages.append(msg)

    messages.sort(key=lambda m: m.date)  # chronological order

    print(f'Найдено {len(messages)} сообщений за 21 марта')
    print(f'Из них фото: {sum(1 for m in messages if m.media and isinstance(m.media, MessageMediaPhoto))}\n')

    # Show all text messages first (for debugging folder names)
    print('--- Текстовые подписи (будут папками) ---')
    for msg in messages:
        text = (msg.text or '').strip()
        if text:
            has_photo = '+ фото' if msg.media and isinstance(msg.media, MessageMediaPhoto) else ''
            print(f'  "{text}" {has_photo}')
    print('---\n')

    # Group photos by captions
    current_folder = 'без_подписи'
    photo_count = 0
    folder_counts = {}

    for msg in messages:
        text = (msg.text or '').strip()

        # Update folder name from text messages or photo captions
        if text:
            candidate = sanitize(text)
            if len(candidate) > 2:
                current_folder = candidate

        # Download photo if present
        if msg.media and isinstance(msg.media, MessageMediaPhoto):
            folder_path = os.path.join(DOWNLOAD_DIR, current_folder)
            os.makedirs(folder_path, exist_ok=True)

            folder_counts[current_folder] = folder_counts.get(current_folder, 0) + 1
            idx = folder_counts[current_folder]

            file_path = os.path.join(folder_path, f'{idx:03d}.jpg')
            await client.download_media(msg, file=file_path)
            photo_count += 1
            print(f'  [{photo_count}] {current_folder}/{idx:03d}.jpg')

    print(f'\nГотово! Скачано {photo_count} фото в {len(folder_counts)} папок:')
    for folder, count in folder_counts.items():
        print(f'  {folder} — {count} фото')

with client:
    client.loop.run_until_complete(main())
