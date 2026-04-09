#!/usr/bin/env python3
"""
Deploy elfprint.ru → reg.ru FTP
Uploads only files changed in the last git commit (public/ directory).
Usage: python3 deploy.py
"""

import ftplib
import os
import subprocess
import sys

FTP_HOST = "31.31.196.240"
FTP_USER = "u3475879_kdfskdfk"
FTP_PASS = "vadpa8-zydnog-heqboJ"
REMOTE_BASE = "/www/elfprint.ru"
LOCAL_BASE = "public"

SKIP_FILES = {
    "public/admin/index.php",
    "public/admin/.htaccess",
}


def get_changed_files():
    try:
        result = subprocess.check_output(
            ["git", "diff", "--name-only", "HEAD~1", "HEAD", "--", "public/"],
            text=True,
        ).strip()
    except subprocess.CalledProcessError:
        print("ERROR: git diff failed. Are you in a git repo with at least 2 commits?")
        sys.exit(1)

    if not result:
        print("No changed files in public/ since last commit.")
        return []

    files = [f for f in result.split("\n") if f and f not in SKIP_FILES]
    return files


def ensure_remote_dir(ftp, remote_dir):
    parts = remote_dir.split("/")
    path = ""
    for part in parts:
        if not part:
            continue
        path += "/" + part
        try:
            ftp.cwd(path)
        except ftplib.error_perm:
            ftp.mkd(path)
            ftp.cwd(path)
    ftp.cwd("/")


def upload_file(ftp, local_path, remote_path):
    remote_dir = os.path.dirname(remote_path)
    ensure_remote_dir(ftp, remote_dir)
    with open(local_path, "rb") as f:
        ftp.storbinary(f"STOR {remote_path}", f)
    print(f"  ✓ {remote_path}")


def main():
    files = get_changed_files()
    if not files:
        return

    print(f"\nFiles to deploy ({len(files)}):")
    for f in files:
        print(f"  {f}")

    print(f"\nConnecting to {FTP_HOST}...")
    ftp = ftplib.FTP()
    ftp.connect(FTP_HOST, 21, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.set_pasv(True)
    print("Connected.\n")

    errors = []
    for local_rel in files:
        local_abs = os.path.join(os.path.dirname(__file__), local_rel)
        if not os.path.isfile(local_abs):
            print(f"  SKIP (not found locally): {local_rel}")
            continue
        # public/foo/bar.html → /www/elfprint.ru/foo/bar.html
        remote_rel = local_rel[len(LOCAL_BASE):]  # strip "public"
        remote_path = REMOTE_BASE + remote_rel
        try:
            upload_file(ftp, local_abs, remote_path)
        except Exception as e:
            print(f"  ERROR {local_rel}: {e}")
            errors.append(local_rel)

    ftp.quit()

    print(f"\nDone. {len(files) - len(errors)} uploaded, {len(errors)} errors.")
    if errors:
        print("Failed:", errors)
        sys.exit(1)


if __name__ == "__main__":
    main()
