from telethon import TelegramClient

api_id = 37245197
api_hash = '7b1847016674377c1b9bddf76e74ec21'

client = TelegramClient('my_session', api_id, api_hash)

async def main():
    await client.start()
    me = await client.get_me()
    print(f'Подключён как: {me.first_name} (@{me.username})')

with client:
    client.loop.run_until_complete(main())
