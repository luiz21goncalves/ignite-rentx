import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column("boolean")
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string {
    switch (process.env.DISK_STORAGE) {
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;

      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;

      default:
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
