# Konfiguracja serwera

## Instalacja FTP

```sh
sudo apt-get update
sudo apt install vsftpd
sudo systemctl start vsftpd
sudo systemctl enable vsftpd
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo usermod –d $lokalizacja_folderu_public_od_cdn ftp
sudo nano /etc/vsftpd.conf
chroot_local_user=YES
write_enable=YES
sudo chroot_list_file=/etc/vsftpd.chroot_list
sudo systemctl restart vsftpd.service
```

