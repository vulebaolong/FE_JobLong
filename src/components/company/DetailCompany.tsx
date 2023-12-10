'use client';

import { ICompany } from '@/interface/company';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IProps {
    dataCompany: IBackendRes<ICompany>;
}

function DetailCompany({ dataCompany }: IProps) {
    const { data: company } = dataCompany;

    const router = useRouter();

    let cleanDescription = DOMPurify.sanitize(company?.description, {
        USE_PROFILES: { html: true },
    });

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="container pt-24">
            <Button variant="contained" onClick={handleBack}>
                Back
            </Button>
            <div>{company.name}</div>
            <div>{company.address}</div>
            <Image
                className="m-auto rounded-3xl"
                src={`${company.logo}`}
                width={160}
                height={160}
                alt={`image logo company ${company.name}`}
                priority={true}
            />
            {/* DESCRIPTION */}
            <div>
                <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
            </div>
        </div>
    );
}
export default DetailCompany;
