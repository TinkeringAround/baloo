import React, {FC} from 'react';

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";
import Base from "./base";

const Voltage: FC = () => {
    const {voltage} = useBaloo();

    return (
        <Section width="47.5%">
            <Base icon="battery" value={`${voltage}V`}/>
        </Section>
    );
};

export default Voltage;
