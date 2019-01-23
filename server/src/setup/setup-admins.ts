import { createConnection } from 'typeorm';
import { User } from '../data/entities/user.entity';
import * as bcrypt from 'bcrypt';

createConnection().then(async (conn) => {

    // Setup admins
    const usersRepository = conn.getRepository<User>(User);

    try {

        const admin1 = new User();
        admin1.email = 'georgelevov@gmail.com';
        admin1.fullname = 'George Levov';
        admin1.password = await bcrypt.hash('Root123$', 10);
        admin1.role = 'ADMIN';
        admin1.avatar = 'images\\default.png';

        const admin2 = new User();
        admin2.email = 'hristo@gmail.com';
        admin2.fullname = 'Hristo Mirchev';
        admin2.password = await bcrypt.hash('Hristo123$', 10);
        admin2.role = 'ADMIN';
        admin2.avatar = 'images\\default.png';

        await usersRepository.save(admin1);
        await usersRepository.save(admin2);
        // tslint:disable-next-line:no-console
        console.log(`~Admins added to DB~`);
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        // tslint:disable-next-line:no-console
        console.log(`Skipping admin setup \n ~please check data~`);
    }
    conn.close();
});