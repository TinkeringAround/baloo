import React, {FC, Fragment, useState} from 'react';

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";
import Base from "./base";
import Mapping from "./mapping";

const Voltage: FC = () => {
    const {voltage, capacity} = useBaloo();
    const [show, setShow] = useState<boolean>(false);

    return (
        <Fragment>
            {show && <Mapping close={() => setShow(false)}/>}
            <Section width="47.5%" click={() => setShow(true)}>
                <Base icon="battery" value={`${voltage.toFixed(2)}V / ${capacity.toFixed(0)}%`}/>
            </Section>
        </Fragment>
    );
};

export default Voltage;
