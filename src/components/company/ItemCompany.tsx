'use client';

import { ICompany } from '@/interface/company';
import { Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProps {
    company: ICompany;
}

function ItemCompany(props: IProps) {
    const { company } = props;
    const router = useRouter();

    return (
        <Card
            key={company._id}
            className="!rounded-3xl space-y-5 p-5 cursor-pointer"
            onClick={() => router.push(`/company/${company._id}`)}
        >
            <Image
                className="m-auto rounded-3xl"
                src={`${company.logo}`}
                width={160}
                height={160}
                alt={`image logo company ${company.name}`}
                priority={true}
            />
            <CardContent>
                <h3 className="text-lg font-bold text-center mb-5">{company.name}</h3>
                <p className="text-base font-normal text-white/70 text-center">{company.address}</p>
            </CardContent>
        </Card>
    );
}
export default ItemCompany;
